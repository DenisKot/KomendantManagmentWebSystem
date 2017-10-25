namespace KomendantWebApp.App_Data.Domain
{
    public class Person : BaseEntity
    {
        public string Name { get; set; }

        public string Date { get; set; }

        public bool IsPayed { get; set; }

        public virtual Room Room { get; set; }
    }
}