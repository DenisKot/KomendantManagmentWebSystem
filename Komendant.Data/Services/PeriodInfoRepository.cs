namespace Komendant.Data.Services
{
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using AutoMapper;
    using Communication;
    using Domain;

    public class PeriodInfoRepository
    {
        public PeriodInfoRepository()
        {
            Configuration.Initilization();
        }

        public IEnumerable<PeriodInfoDto> GetAll()
        {
            using (var context = new AppDbContext())
            {
                return Mapper.Map<IEnumerable<PeriodInfoDto>>(context.PeriodInfos.ToList());
            }
        }

        public IEnumerable<SimpleDto> Search(string searchString)
        {
            using (var context = new AppDbContext())
            {
                var query = context.PeriodInfos.AsQueryable();

                if (!string.IsNullOrEmpty(searchString))
                {
                    query = query.Where(x => x.Name.ToLower().Contains(searchString.ToLower()));
                }

                query = query.OrderByDescending(x => x.Date).Take(() => 10);
                var res = query.ToList();
                return Mapper.Map<IEnumerable<SimpleDto>>(res);
            }
        }

        public void Save(PeriodInfoDto dtoModel)
        {
            using (var context = new AppDbContext())
            {
                var model = context.PeriodInfos.FirstOrDefault(x => x.Id == dtoModel.Id);

                if (model == null)
                {
                    model = new PeriodInfo();
                }

                model = Mapper.Map(dtoModel, model);

                if (model.Id != 0)
                {
                    context.Entry(model).State = EntityState.Modified;
                }
                else
                {
                    context.PeriodInfos.Add(model);
                }

                context.SaveChanges();
            }
        }

        public void Delete(PeriodInfoDto dtoModel)
        {
            using (var context = new AppDbContext())
            {
                var model = context.PeriodInfos.FirstOrDefault(x => x.Id == dtoModel.Id);
                if (model != null)
                    context.PeriodInfos.Remove(model);
                context.SaveChanges();
            }
        }
    }
}