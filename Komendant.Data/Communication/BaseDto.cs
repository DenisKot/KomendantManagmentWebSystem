namespace Komendant.Data.Communication
{
    using Newtonsoft.Json;

    public class BaseDto
    {
        [JsonProperty("id")]
        public int Id { get; set; }
    }
}