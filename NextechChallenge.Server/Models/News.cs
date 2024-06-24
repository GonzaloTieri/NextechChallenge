namespace NextechChallenge.Server.Models
{
    public class News
    {
        public int Id { get; set; }
        public bool Deleted { get; set; }
        public string Type { get; set; }
        public string Text { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }

    }
}
