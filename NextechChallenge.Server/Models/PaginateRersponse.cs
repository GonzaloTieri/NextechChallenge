namespace NextechChallenge.Server.Models
{
    public class PaginatedResponse
    {
        public List<News> Data { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
    }
}
