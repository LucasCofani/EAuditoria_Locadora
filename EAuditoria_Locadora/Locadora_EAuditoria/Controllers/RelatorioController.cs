using Locadora_EAuditoria.Service;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Locadora_EAuditoria.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatorioController : ControllerBase
    {
        private readonly IRelatorioService _repository;
        public RelatorioController(IRelatorioService repository)
        {
            _repository = repository;
        }

        /// <remarks>
        /// Opções validas: <br />
        /// atrasados -  Clientes em atraso na devolucao <br />
        /// naoalugados - Filmes que nunca foram alugados <br />
        /// topanoalugados - Cinco filmes mais alugados do ultimo ano <br />
        /// bottomsemanaalugados - Cinco filmes menos alugados na ultima semana <br />
        /// topclientesaluguel - Cinco clientes que mais alugaram filmes 
        /// </remarks>
        [HttpGet("{nomeRelatorio}")]
        public async Task<IActionResult> Get(string nomeRelatorio)
        {
            try
            {
                switch (nomeRelatorio.ToLower())
                {
                    case "atrasados":
                        return Ok(await _repository.GetAtrasados());

                    case "naoalugados":
                        return Ok(await _repository.GetNaoAlugados());

                    case "topanoalugados":
                        return Ok(await _repository.GetTopAnoAlugados());

                    case "bottomsemanaalugados":
                        return Ok(await _repository.GetBottomSemanaAlugados());

                    case "topclientesaluguel":
                        return Ok(await _repository.GetTopClienteAluguel());

                    default:
                        return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(
                    ex.Message
                    );
                throw;
            }
            
        }

    }
}
