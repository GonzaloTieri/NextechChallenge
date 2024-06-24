using Microsoft.AspNetCore.Mvc;
using NextechChallenge.Server.Services;
using NextechChallenge.Server.Services.Interfaces;

namespace NextechChallenge.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IHackerNewsService _hackerNewsService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IHackerNewsService hackerNewsService)
        {
            _logger = logger;
            _hackerNewsService = hackerNewsService;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<IActionResult> GetNewStories()
        {
            var result = await _hackerNewsService.GetNewStoriesAsync();

            return Ok(result.Data);
        }

        //[HttpGet(Name = "GetWeatherForecast")]
        //public IEnumerable<WeatherForecast> Get()
        //{
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        //        TemperatureC = Random.Shared.Next(-20, 55),
        //        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        //    })
        //    .ToArray();
        //}
    }
}
