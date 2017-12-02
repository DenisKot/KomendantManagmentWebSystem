namespace KomendantWebApp.Controllers.Api
{
    using System.Collections.Generic;
    using System.Web.Http;
    using Komendant.Data.Communication;
    using Komendant.Data.Services;

    public class PeriodInfoController : ApiController
    {
        [HttpGet]
        [Route("api/period/getAll")]
        public IEnumerable<PeriodInfoDto> GetAll()
        {
            return new PeriodInfoRepository().GetAll();
        }

        [HttpPost]
        [Route("api/period/save")]
        public void Save([FromBody]PeriodInfoDto dto)
        {
            new PeriodInfoRepository().Save(dto);
        }

        [HttpPost]
        [Route("api/period/delete")]
        public void Delete([FromBody]PeriodInfoDto dto)
        {
            new PeriodInfoRepository().Delete(dto);
        }
    }
}