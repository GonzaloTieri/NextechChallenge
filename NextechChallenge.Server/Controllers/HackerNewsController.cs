using Microsoft.AspNetCore.Mvc;
using NextechChallenge.Server.Services.Interfaces;

namespace NextechChallenge.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HackerNewsController : ControllerBase
    {
       private readonly IHackerNewsService _hackerNewsService;
        public HackerNewsController(IHackerNewsService hackerNewsService ) 
        {
            _hackerNewsService = hackerNewsService;    
        }

        [HttpGet("getnewstories")]
        public async Task<IActionResult> GetNewStories([FromQuery] string searchText = "", [FromQuery] int pageNumber = 1)
        {
            var result = await _hackerNewsService.GetNewStoriesSearchAsync(searchText, pageNumber, 10);

            return Ok(result);
        }

    }
}
