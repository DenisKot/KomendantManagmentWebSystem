namespace Komendant.Data.Communication
{
    using System.Collections.ObjectModel;
    using Newtonsoft.Json;

    public class RoomDto : BaseDto
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("capacity")]
        public string Capacity { get; set; }

        [JsonProperty("persons")]
        public virtual Collection<SimpleDto> Persons { get; set; }
    }
}