namespace KomendantWebApp.Controllers.Api
{
    using System.Collections.Generic;
    using System.Web.Http;
    using Komendant.Data.Communication;
    using Komendant.Data.Services;

    public class PersonController : ApiController
    {
        [HttpGet]
        [Route("api/person/getAll")]
        public IEnumerable<PersonDto> GetAll()
        {
            return new PersonRepository().GetAll();
        }

        [HttpPost]
        [Route("api/person/save")]
        public void Save([FromBody]PersonDto roomDto)
        {
            new PersonRepository().Save(roomDto);
        }

        [HttpPost]
        [Route("api/person/delete")]
        public void Delete([FromBody]PersonDto roomDto)
        {
            new PersonRepository().Delete(roomDto);
        }
    }
}