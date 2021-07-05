using DataLayer.Entites.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer.Servicse.Interface
{
 public interface IUserService : IDisposable
  {
   
      Task<List<User>> GetAllUsers();
    
  }
}
