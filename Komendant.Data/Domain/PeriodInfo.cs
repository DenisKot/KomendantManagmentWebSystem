namespace Komendant.Data.Domain
{
    using System;

    public class PeriodInfo : BaseEntity
    {
        public DateTime Date { get; set; }

        public string Name { get; set; }

        /// <summary>
        /// Прибуток
        /// </summary>
        public double Profit { get; set; }

        /// <summary>
        /// Витрати
        /// </summary>
        public double Cost { get; set; }
    }
}