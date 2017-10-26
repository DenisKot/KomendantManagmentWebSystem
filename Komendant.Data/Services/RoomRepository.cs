namespace Komendant.Data.Services
{
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using AutoMapper;
    using Communication;
    using Domain;

    public class RoomRepository
    {
        
        public RoomRepository()
        {
            Configuration.Initilization();
        }

        public IEnumerable<RoomDto> GetAll()
        {
            using (var context = new AppDbContext())
            {
                return Mapper.Map<IEnumerable<RoomDto>>(context.Rooms.ToList());
            }
        }

        public IEnumerable<SimpleDto> Search(string searchString)
        {
            using (var context = new AppDbContext())
            {
                var query = context.Rooms.AsQueryable();

                if (!string.IsNullOrEmpty(searchString))
                {
                    query = query.Where(x => x.Name.ToLower().Contains(searchString.ToLower()));
                }

                query = query.Take(() => 10);
                var res = query.ToList();
                return Mapper.Map<IEnumerable<SimpleDto>>(res);
            }
        }

        public void Save(RoomDto dtoModel)
        {
            using (var context = new AppDbContext())
            {
                var model = context.Rooms.FirstOrDefault(x => x.Id == dtoModel.Id);

                if (model == null)
                {
                    model = new Room();
                }

                model = Mapper.Map(dtoModel, model);
                
                if (model.Id != 0)
                {
                    context.Entry(model).State = EntityState.Modified;
                }
                else
                {
                    context.Rooms.Add(model);
                }

                context.SaveChanges();
            }
        }

        public void Delete(RoomDto dtoModel)
        {
            using (var context = new AppDbContext())
            {
                var model = context.Rooms.FirstOrDefault(x => x.Id == dtoModel.Id);
                if (model != null)
                    context.Rooms.Remove(model);
                context.SaveChanges();
            }
        }
    }
}