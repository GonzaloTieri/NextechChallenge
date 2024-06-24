namespace NextechChallenge.Server.Models
{
    public class Response<T>
    {
        public T Data { get; set; }
        public List<string> Messages { get; set; }
        public bool Processed { get; set; }
    }
}
