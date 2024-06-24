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
        public async Task<IActionResult> GetNewStories()
        {
            var result = await _hackerNewsService.GetNewStoriesAsync();

            return Ok(result.Data);
        }

    }
}
