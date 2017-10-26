namespace KomendantWebApp.App_Data
{
    using Newtonsoft.Json;

    public class PersonDto : BaseDto
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("date")]
        public string Date { get; set; }

        [JsonProperty("isPayed")]
        public bool IsPayed { get; set; }

        [JsonProperty("room")]
        public virtual RoomDto Room { get; set; }
    }
}