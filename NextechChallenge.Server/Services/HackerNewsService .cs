using Newtonsoft.Json;
using NextechChallenge.Server.Models;
using NextechChallenge.Server.Services.Interfaces;
using System.IO.Pipelines;
using System.Net;

namespace NextechChallenge.Server.Services
{
    public class HackerNewsService : IHackerNewsService
    {
        private readonly HttpClient _httpClient;

        public HackerNewsService() { 
            _httpClient = new HttpClient();
        }

        public async Task<Response<List<News>>> GetNewStoriesAsync()
        {
            var idsNews = await _httpClient.GetAsync("https://hacker-news.firebaseio.com/v0/showstories.json");

            var responseContent = new List<int>();
            var newsList = new List<News>();

            if (idsNews.StatusCode == HttpStatusCode.OK)
            {
                var response = await idsNews.Content.ReadAsStringAsync();
                responseContent = JsonConvert.DeserializeObject<List<int>>(response);
                foreach( int id in responseContent)
                {
                    string url = $"https://hacker-news.firebaseio.com/v0/item/{id}.json";
                    var newsJson = await _httpClient.GetAsync(url);

                    if (newsJson.StatusCode == HttpStatusCode.OK)
                    {
                        var newsString = await newsJson.Content.ReadAsStringAsync();
                        var news = JsonConvert.DeserializeObject<News>(newsString);
                        newsList.Add(news);
                    }
                    
                }
            }

            return new Response<List<News>>
            {
                Data = newsList
            };

        }
    }
}
