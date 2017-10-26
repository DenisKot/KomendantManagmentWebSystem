namespace KomendantWebApp.App_Data
{
    using Newtonsoft.Json;

    public class BaseDto
    {
        [JsonProperty("id")]
        public int Id { get; set; }
    }
}