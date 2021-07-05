using DataLayer.Entites.Account;
using DataLayer.Repository;
using Microsoft.EntityFrameworkCore;
using ServicesLayer.Servicse.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer.Servicse.Implamtinan
{
 public class UserService:IUserService
  {
    #region constructor

    private IGenericRepository<User> userRepository;

    public UserService(IGenericRepository<User> userRepository)
    {
      this.userRepository = userRepository;
    }

    #endregion

    #region User Section

    public async Task<List<User>> GetAllUsers()
    {
      return await userRepository.GetEntitiesQuery().ToListAsync();
    }

    #endregion

    #region dispose

    public void Dispose()
    {
      userRepository?.Dispose();
    }

    #endregion
  }
}
