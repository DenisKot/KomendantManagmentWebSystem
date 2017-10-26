namespace Komendant.Data.Domain
{
    using System.Collections.ObjectModel;

    public class Room : BaseEntity
    {
        public string Name { get; set; }

        public string Capacity { get; set; }

        public virtual Collection<Person> Persons { get; set; }
    }
}