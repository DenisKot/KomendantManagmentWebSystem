namespace KomendantWebApp.App_Data
{
    using System.Collections.ObjectModel;
    using Newtonsoft.Json;

    public class RoomDto : BaseDto
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        public string Capacity { get; set; }

        public virtual Collection<SimpleDto> Persons { get; set; }
    }
}