using NextechChallenge.Server.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NextechChallenge.Server.Services.Interfaces
{
    public interface IHackerNewsService
    {
        Task<Response<List<News>>> GetNewStoriesAsync();
        Task<PaginatedResponse> GetNewStoriesSearchAsync(string searchText, int pageNumber, int pageSize);
    }
}
