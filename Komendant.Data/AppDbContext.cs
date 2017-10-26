namespace Komendant.Data
{
    using System;
    using System.Data.Entity;
    using System.Linq;
    using Domain;

    public class AppDbContext : DbContext
    {
        public AppDbContext()
            : base("name=AppDbContext")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>().HasOptional(tg => tg.Room).WithMany(r => r.Persons);
            base.OnModelCreating(modelBuilder);
        }

        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<Person> Persons { get; set; }
    }
}