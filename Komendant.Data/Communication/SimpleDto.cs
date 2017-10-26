namespace Komendant.Data.Communication
{
    using Newtonsoft.Json;

    public class SimpleDto : BaseDto
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}