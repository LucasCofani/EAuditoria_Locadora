using Locadora_EAuditoria.Models;

namespace Locadora_EAuditoria.Service
{
    public interface IService<T>
    {
        Task<ResponseWrapper<List<T>>> GetAllAsync();
        Task<ResponseWrapper<T>> GetByIdAsync(int id);
        Task<ResponseWrapper<T>> CreateAsync(T request);
        Task<ResponseWrapper<string>> UpdateAsync(int id, T request);
        Task<ResponseWrapper<string>> DeleteAsync(int id);
    }
}
