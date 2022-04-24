using Locadora_EAuditoria.Data;
using Locadora_EAuditoria.Models;
using Microsoft.EntityFrameworkCore;

namespace Locadora_EAuditoria.Service
{
    public class FilmeService : IService<Filme>
    {
        private readonly DefaultDbContext _db;
        private static string notFound = "Filme nao encontrado";
        public FilmeService(DefaultDbContext db)
        {
            _db = db;
        }
        public async Task<ResponseWrapper<Filme>> CreateAsync(Filme request)
        {
            try
            {
                await _db.filmes.AddAsync(request);
                await _db.SaveChangesAsync();
                return ResponseWrapper<Filme>.Ok(request);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<Filme>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<string>> DeleteAsync(int id)
        {
            try
            {
                var info = await _db.filmes.FirstOrDefaultAsync(p => p.id == id);
                if (info != null)
                {
                    _db.filmes.Remove(info);
                    await _db.SaveChangesAsync();
                    return ResponseWrapper<string>.Ok($"Filme deletado:{id}");
                }
                return ResponseWrapper<string>.Error(notFound);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<string>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<List<Filme>>> GetAllAsync()
        {
            try
            {
                var info = await _db.filmes.Include(p => p.Locacoes).ThenInclude(p => p.Cliente).AsNoTracking().ToListAsync();
                var res = new List<Filme>();
                foreach (var item in info)
                {
                    var returnItem = new Filme();
                    returnItem.Update(item);
                    res.Add(returnItem);
                }
                return ResponseWrapper<List<Filme>>.Ok(res);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<List<Filme>>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<Filme>> GetByIdAsync(int id)
        {
            try
            {
                var info = await _db.filmes.Include(p => p.Locacoes).ThenInclude(p => p.Cliente).FirstOrDefaultAsync(p => p.id == id);
                if (info != null)
                {
                    return ResponseWrapper<Filme>.Ok(info);
                }
                return ResponseWrapper<Filme>.Error(notFound);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<Filme>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<string>> UpdateAsync(int id, Filme request)
        {
            try
            {
                var info = await _db.filmes.FirstOrDefaultAsync(p => p.id == id);
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
