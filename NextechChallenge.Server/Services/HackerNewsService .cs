using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using NextechChallenge.Server.Models;
using NextechChallenge.Server.Services.Interfaces;
using System.Collections.Concurrent;
using System.IO.Pipelines;
using System.Net;
using System.Net.Http;

namespace NextechChallenge.Server.Services
{
    public class HackerNewsService : IHackerNewsService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;
        private readonly TimeSpan _cacheDuration = TimeSpan.FromMinutes(60);

        public HackerNewsService(HttpClient httpClient, IMemoryCache cache) {
            _httpClient = httpClient;
            _cache = cache;
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

        public async Task<PaginatedResponse> GetNewStoriesSearchAsync(string searchText, int pageNumber, int pageSize)
        {
            var cacheKey = "NewStories";
            if (_cache.TryGetValue(cacheKey, out List<News> cachedNewsList))
            {
                var cachedFilteredNewsList = string.IsNullOrEmpty(searchText) ? cachedNewsList :  cachedNewsList.Where(news => !string.IsNullOrEmpty(news.Text) && news.Text.Contains(searchText, StringComparison.OrdinalIgnoreCase))
                .ToList();

                var cachedTotalItems = cachedFilteredNewsList.Count;
                var cachedTotalPages = (int)Math.Ceiling(cachedTotalItems / (double)pageSize);
                var cachedPaginatedNewsList = cachedFilteredNewsList
                   .Skip((pageNumber - 1) * pageSize)
                   .Take(pageSize)
                   .ToList();

                return new PaginatedResponse
                {
                    Data = cachedPaginatedNewsList,
                    TotalItems = cachedTotalItems,
                    TotalPages = cachedTotalPages,
                    CurrentPage = pageNumber
                };
            }

            var idsNews = await _httpClient.GetAsync("https://hacker-news.firebaseio.com/v0/showstories.json");

            var responseContent = new List<int>();
            var newsList = new List<News>();

            if (idsNews.StatusCode == HttpStatusCode.OK)
            {
                var response = await idsNews.Content.ReadAsStringAsync();
                responseContent = JsonConvert.DeserializeObject<List<int>>(response);

                foreach (int id in responseContent)
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

            _cache.Set(cacheKey, newsList, _cacheDuration);


            var filteredNewsList = string.IsNullOrEmpty(searchText) ? newsList : newsList.Where(news => !string.IsNullOrEmpty(news.Text) && news.Text.Contains(searchText, StringComparison.OrdinalIgnoreCase))
                .ToList();

            var totalItems = filteredNewsList.Count;
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            var paginatedNewsList = filteredNewsList
               .Skip((pageNumber - 1) * pageSize)
               .Take(pageSize)
               .ToList();

            return new PaginatedResponse
            {
                Data = paginatedNewsList,
                TotalItems = totalItems,
                TotalPages = totalPages,
                CurrentPage = pageNumber
            };
        }
    }
}
