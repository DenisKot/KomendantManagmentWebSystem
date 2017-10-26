namespace KomendantWebApp.Controllers.Api
{
    using System.Collections.Generic;
    using System.Web.Http;
    using Komendant.Data.Communication;
    using Komendant.Data.Domain;
    using Komendant.Data.Services;

    public class RoomController : ApiController
    {
        [HttpGet]
        [Route("api/room/getAll")]
        public IEnumerable<RoomDto> GetAll()
        {
            return new RoomRepository().GetAll();
        }

        [HttpPost]
        [Route("api/room/save")]
        public void Save([FromBody]RoomDto roomDto)
        {
            new RoomRepository().Save(roomDto);
        }

        [HttpPost]
        [Route("api/room/delete")]
        public void Delete([FromBody]RoomDto roomDto)
        {
            new RoomRepository().Delete(roomDto);
        }
    }
}