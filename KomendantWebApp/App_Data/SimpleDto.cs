namespace KomendantWebApp.App_Data
{
    using Newtonsoft.Json;

    public class SimpleDto : BaseDto
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}