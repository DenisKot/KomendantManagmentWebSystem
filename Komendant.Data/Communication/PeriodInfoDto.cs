namespace Komendant.Data.Communication
{
    using System;
    using Newtonsoft.Json;

    public class PeriodInfoDto : BaseDto
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("date")]
        public DateTime Date { get; set; }

        [JsonProperty("profit")]
        public double Profit { get; set; }

        [JsonProperty("cost")]
        public double Cost { get; set; }

        [JsonProperty("profitClear")]
        public double ProfitClear => this.Profit - this.Cost;
    }
}