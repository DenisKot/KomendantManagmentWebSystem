namespace Komendant.Data.Services
{
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using AutoMapper;
    using Communication;
    using Domain;

    public class PersonRepository
    {
        public PersonRepository()
        {
            Configuration.Initilization();
        }

        public IEnumerable<PersonDto> GetAll()
        {
            using (var context = new AppDbContext())
            {
                return Mapper.Map<IEnumerable<PersonDto>>(context.Persons.ToList());
            }
        }

        public void Save(PersonDto dtoModel)
        {
            using (var context = new AppDbContext())
            {
                var model = context.Persons.FirstOrDefault(x => x.Id == dtoModel.Id);

                if (model == null)
                {
                    model = new Person();
                }

                model = Mapper.Map(dtoModel, model);

                if (dtoModel.Room != null && dtoModel.Room.Id > 0)
                {
                    model.Room = context.Rooms.FirstOrDefault(x => x.Id == dtoModel.Room.Id);
                }
                else
                {
                    var hack = model.Room;
                    model.Room = null;
                }

                if (model.Id != 0)
                {
                    context.Entry(model).State = EntityState.Modified;
                }
                else
                {
                    context.Persons.Add(model);
                }

                context.SaveChanges();
            }
        }

        public void Delete(PersonDto dtoModel)
        {
            using (var context = new AppDbContext())
            {
                var model = context.Persons.FirstOrDefault(x => x.Id == dtoModel.Id);
                if (model != null)
                    context.Persons.Remove(model);
                context.SaveChanges();
            }
        }
    }
}