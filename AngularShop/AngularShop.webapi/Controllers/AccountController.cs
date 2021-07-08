
using AngularShop.webapi.Controllers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ServicesLayer.DTOs.Account;
using ServicesLayer.Servicse.Interface;
using ServicesLayer.Uitelites.Comman;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

public class AccountController : SiteController
{
  #region Constractor

  public readonly IUserService _UserService;

  public AccountController(IUserService userService)
  {
    _UserService = userService;
  }

  #endregion

  #region Register
  [HttpPost("Register")]
  public async Task<IActionResult> Register([FromBody] RegisterUserDTO register)
  {
    if (ModelState.IsValid)
    {
      var res = await _UserService.RegisterUser(register);
      switch (res)
      {
        case RegisterUserResult.EmailExists:
          return JsonResponseStatus.Error(new { status = "Exist Email" });

      }
    }

    return JsonResponseStatus.Success();
  }
  #endregion

  #region Login


  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginUserDTO login)
  {
    if (ModelState.IsValid)
    {
      var res = await _UserService.LoginUser(login);

      switch (res)
      {
        case LoginUserResult.IncorrectData:
          return JsonResponseStatus.NotFound();

        case LoginUserResult.NotActivated:
          return JsonResponseStatus.Error(new { message = "حساب کاربری شما فعال نشده است" });

        case LoginUserResult.Success:
          var user = await _UserService.GetUserByEmail(login.Email);
          var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("AngularEshopJwtBearer"));
          var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
          var tokenOptions = new JwtSecurityToken(
            issuer: "https://localhost:44373",
            claims: new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            },
            expires: DateTime.Now.AddDays(30),
            signingCredentials: signinCredentials
          );

          var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

          return JsonResponseStatus.Success(new { token = tokenString, expireTime = 30, firstName = user.FirstName, lastName = user.LastName, userId = user.Id });
      }
    }

    return JsonResponseStatus.Error();
  }


  #endregion

  #region SingOut


  [HttpGet("sing-out")]
  public async Task<IActionResult> LogOut()
  {
    if (User.Identity.IsAuthenticated)
    {
      await HttpContext.SignOutAsync();
      return JsonResponseStatus.Success();
    }

    return JsonResponseStatus.Error();
  }


  #endregion
}

