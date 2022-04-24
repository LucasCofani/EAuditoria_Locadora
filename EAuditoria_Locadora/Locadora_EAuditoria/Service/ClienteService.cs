using Locadora_EAuditoria.Data;
using Locadora_EAuditoria.Models;
using Microsoft.EntityFrameworkCore;

namespace Locadora_EAuditoria.Service
{
    public class ClienteService : IService<Cliente>
    {
        private readonly DefaultDbContext _db;
        private static string notFound = "Cliente nao encontrado";
        public ClienteService(DefaultDbContext db)
        {
            _db = db;
        }

        public async Task<ResponseWrapper<Cliente>> CreateAsync(Cliente request)
        {
            try
            {
                await _db.clientes.AddAsync(request);
                await _db.SaveChangesAsync();
                return ResponseWrapper<Cliente>.Ok(request);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<Cliente>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<string>> DeleteAsync(int id)
        {
            try
            {
                var info = await _db.clientes.FirstOrDefaultAsync(p => p.id == id);
                if (info != null)
                {
                    _db.clientes.Remove(info);
                    await _db.SaveChangesAsync();
                    return ResponseWrapper<string>.Ok($"Cliente deletado:{id}");
                }
                return ResponseWrapper<string>.Error(notFound);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<string>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<List<Cliente>>> GetAllAsync()
        {
            try
            {
                var info = await _db.clientes.Include(p => p.Locacoes).ThenInclude(p => p.Filme).AsNoTracking().ToListAsync();
                var res = new List<Cliente>();
                foreach (var item in info)
                {
                    var returnItem = new Cliente();
                    returnItem.Update(item);
                    res.Add(returnItem);
                }
                return ResponseWrapper<List<Cliente>>.Ok(res);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<List<Cliente>>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<Cliente>> GetByIdAsync(int id)
        {
            try
            {
                var info = await _db.clientes.Include(p => p.Locacoes).ThenInclude(p => p.Filme).FirstOrDefaultAsync(p => p.id == id);
                if (info != null)
                {
                    return ResponseWrapper<Cliente>.Ok(info);
                }
                return ResponseWrapper<Cliente>.Error(notFound);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<Cliente>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<string>> UpdateAsync(int id, Cliente request)
        {
            try
            {
                var info = await _db.clientes.FirstOrDefaultAsync(p => p.id == id);
                if (info != null)
                {
                    info.Update(request);
                    await _db.SaveChangesAsync();
                    return ResponseWrapper<string>.Ok("Falha no update");
                }
                return ResponseWrapper<string>.Error(notFound);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<string>.Error(ex.Message);
            }
        }
    }
}
