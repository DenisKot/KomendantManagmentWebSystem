namespace Komendant.Data.Services
{
    using AutoMapper;
    using Communication;
    using Domain;

    public class Configuration
    {
        public static void Initilization()
        {
            Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<Room, RoomDto>();
                    cfg.CreateMap<RoomDto, Room>()
                        .ForMember(dst => dst.Persons, map => map.Ignore());
                    cfg.CreateMap<Room, SimpleDto>();

                    cfg.CreateMap<Person, PersonDto>();
                    cfg.CreateMap<PersonDto, Person>()
                        .ForMember(dst => dst.Room, map => map.Ignore());
                    cfg.CreateMap<Person, SimpleDto>();

                    cfg.CreateMap<PeriodInfo, PeriodInfoDto>();
                    cfg.CreateMap<PeriodInfoDto, PeriodInfo>();
                    cfg.CreateMap<PeriodInfo, SimpleDto>();
                });
        }
    }
}