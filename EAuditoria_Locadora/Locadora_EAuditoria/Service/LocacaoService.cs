using Locadora_EAuditoria.Data;
using Locadora_EAuditoria.Models;
using Microsoft.EntityFrameworkCore;

namespace Locadora_EAuditoria.Service
{
    public class LocacaoService : IService<LocacaoDTO>
    {
        private readonly DefaultDbContext _db;
        private static string notFound = "Locacao nao encontrado";
        public LocacaoService(DefaultDbContext db)
        {
            _db = db;
        }
        public async Task<ResponseWrapper<LocacaoDTO>> CreateAsync(LocacaoDTO request)
        {
            try
            {
                await _db.locacoes.AddAsync(request);
                await _db.SaveChangesAsync();
                return ResponseWrapper<LocacaoDTO>.Ok(request);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<LocacaoDTO>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<string>> DeleteAsync(int id)
        {
            try
            {
                var info = await _db.locacoes.FirstOrDefaultAsync(p => p.id == id);
                if (info != null)
                {
                    _db.locacoes.Remove(info);
                    await _db.SaveChangesAsync();
                    return ResponseWrapper<string>.Ok($"Locacao deletada:{id}");
                }
                return ResponseWrapper<string>.Error(notFound);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<string>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<List<LocacaoDTO>>> GetAllAsync()
        {
            try
            {
                var info = await _db.locacoes.Include(p => p.Filme).Include(p => p.Cliente).AsNoTracking().ToListAsync();
                var res = new List<LocacaoDTO>();
                foreach (var item in info)
                {
                    res.Add(new LocacaoDTO(item));
                }
                return ResponseWrapper<List<LocacaoDTO>>.Ok(res);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<List<LocacaoDTO>>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<LocacaoDTO>> GetByIdAsync(int id)
        {
            try
            {
                var info = await _db.locacoes.Include(p => p.Filme).Include(p => p.Cliente).FirstOrDefaultAsync(p => p.id == id);
                if (info != null)
                {
                    return ResponseWrapper<LocacaoDTO>.Ok(new LocacaoDTO(info));
                }
                return ResponseWrapper<LocacaoDTO>.Error(notFound);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<LocacaoDTO>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<string>> UpdateAsync(int id, LocacaoDTO request)
        {
            try
            {
                var info = await _db.locacoes.FirstOrDefaultAsync(p => p.id == id);
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
