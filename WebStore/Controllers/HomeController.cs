using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebStore.Db.Context;

namespace WebStore.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IOptions<StoreDbContext> _options;

        public HomeController(ILogger<HomeController> logger, IOptions<StoreDbContext> options)
        {
            _logger = logger;
            _options = options;
        }
    }
}
