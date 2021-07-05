using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Entites.Products
{
  public class ProductVisit:BaseEntity
  {
    #region properties

    public int ProductId { get; set; }

    [Display(Name = "IP")]
    [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
    [MaxLength(100, ErrorMessage = "تعداد کاراکتر های {0} نمیتواند بیشتر از {1} باشد")]
    public string UserIp { get; set; }

    #endregion

    #region relations

    public Product Product { get; set; }

    #endregion
  }
}
