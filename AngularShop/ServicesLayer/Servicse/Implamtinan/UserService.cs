using DataLayer.Entites.Account;
using DataLayer.Repository;
using Microsoft.EntityFrameworkCore;
using ServicesLayer.DTOs.Account;
using ServicesLayer.Security;
using ServicesLayer.Servicse.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServicesLayer.Servicse.Implamtinan
{
  public class UserService : IUserService
  {
    #region constructor

    private readonly IPasswordHelper _passsHelper;
    private IGenericRepository<User> _userRepository;

    public UserService(IGenericRepository<User> userRepository,IPasswordHelper passsHelper)
    {
      _userRepository = userRepository;
      _passsHelper = passsHelper;
    }

    #endregion

    #region Register

    public async Task<RegisterUserResult> RegisterUser(RegisterUserDTO register)
    {
      if (IsUserExistByEmail(register.Email))
        return RegisterUserResult.EmailExists;

      String passhas = _passsHelper.EncodePasswordMd5(register.Password);
      User user = new User
      {
        Email = register.Email.SanitizeText(),
        Address = register.Address.SanitizeText(),
        FirstName = register.FirstName.SanitizeText(),
        LastName = register.LastName.SanitizeText(),
        EmailActiveCode = Guid.NewGuid().ToString(),
        Password = passhas
      };
      await _userRepository.AddEntity(user);
     await _userRepository.SaveChanges();

      return RegisterUserResult.Success;
    }

    public bool IsUserExistByEmail(string email)
    {
      return _userRepository.GetEntitiesQuery().Any(e => e.Email == email.ToLower().Trim());
    }

    #endregion
    #region Login

    public async Task<LoginUserResult> LoginUser(LoginUserDTO loginUser)
    {
      var password = new PasswordHelper().EncodePasswordMd5(loginUser.Password);

      var user = await _userRepository.GetEntitiesQuery()
        .SingleOrDefaultAsync(s => s.Email == loginUser.Email.ToLower().Trim() && s.Password == password);

      if (user == null) return LoginUserResult.IncorrectData;

      if (!user.IsActivated) return LoginUserResult.NotActivated;

      return LoginUserResult.Success;
    }
    public async Task<User> GetUserByEmail(string email)
    {
      return await _userRepository.GetEntitiesQuery().SingleOrDefaultAsync(s => s.Email == email.ToLower().Trim());
    }
    #endregion

    #region User Section

    public async Task<List<User>> GetAllUsers()
    {
      return await _userRepository.GetEntitiesQuery().ToListAsync();
    }

    #endregion

    #region dispose

    public void Dispose()
    {
      _userRepository?.Dispose();
    }

    #endregion
  }
}
