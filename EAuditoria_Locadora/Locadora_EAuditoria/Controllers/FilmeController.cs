using Locadora_EAuditoria.Models;
using Locadora_EAuditoria.Service;
using Microsoft.AspNetCore.Mvc;

namespace Locadora_EAuditoria.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilmeController : ControllerBase
    {
        private readonly IService<Filme> _repository;
        public FilmeController(IService<Filme> repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var p = await _repository.GetAllAsync();
                if (p.Status == "Error")
                {
                    return BadRequest(p.ErrorMsg);
                }
                return Ok(p);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var p = await _repository.GetByIdAsync(id);
                if (p.Status == "Error")
                {
                    return BadRequest(p.ErrorMsg);
                }
                return Ok(p);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Filme request)
        {
            try
            {
                var p = await _repository.CreateAsync(request);
                if (p.Status == "Error")
                {
                    return BadRequest(p.ErrorMsg);
                }
                return Ok(p);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Filme request)
        {
            try
            {
                var p = await _repository.UpdateAsync(id, request);
                if (p.Status == "Error")
                {
                    return BadRequest(p.ErrorMsg);
                }
                return Ok(p);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var p = await _repository.DeleteAsync(id);
                if (p.Status == "Error")
                {
                    return BadRequest(p.ErrorMsg);
                }
                return Ok(p);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
