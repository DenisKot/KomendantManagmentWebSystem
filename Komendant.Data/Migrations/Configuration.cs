namespace Komendant.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    using Domain;

    internal sealed class Configuration : DbMigrationsConfiguration<AppDbContext>
    {
        public Configuration()
        {
            this.AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(AppDbContext context)
        {
            for (int i = 1; i <= 5; i++)
            {
                var item = new PeriodInfo
                {
                    Name = "Період " + i,
                    Profit = 50000 + 10000*i,
                    Cost = 65000 + 5000 * i,
                    Date = new DateTime(2017, i, 1)
                };
                context.PeriodInfos.Add(item);
            }

            for (int i = 1; i <= 5; i++)
            {
                for (int j = 1; j <= 20; j++)
                {
                    var room = new Room
                    {
                        Name = (i * 100 + j).ToString(),
                        Capacity = "4"
                    };

                    context.Rooms.Add(room);
                }
            }

            context.SaveChanges();
        }
    }
}