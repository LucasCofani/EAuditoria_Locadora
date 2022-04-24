using Locadora_EAuditoria.Models;

namespace Locadora_EAuditoria.Service
{
    public class RelatorioService : IRelatorioService
    {
        private readonly IService<LocacaoDTO> _locacao;
        private readonly IService<Filme> _filme;
        private readonly IService<Cliente> _cliente;
        public RelatorioService(IService<LocacaoDTO> locacao, IService<Filme> filme, IService<Cliente> cliente)
        {
            _locacao = locacao;
            _filme = filme;
            _cliente = cliente;
        }
        public async Task<ResponseWrapper<List<Cliente>>> GetAtrasados()
        {
            try
            {
                var locacoes = await _locacao.GetAllAsync();
                var clientes = await _cliente.GetAllAsync();
                var atrasadosId = locacoes.Info
                    .Where(p => p.Atrasado == 1)
                    .Select(p => p.Cliente)
                    .GroupBy(p => p.id)
                    .Select(p => p.Key)
                    .ToList();
                var atrasados = clientes.Info.Where(p => atrasadosId.Contains(p.id)).ToList();

                return ResponseWrapper<List<Cliente>>.Ok(atrasados);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<List<Cliente>>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<List<Filme>>> GetBottomSemanaAlugados()
        {
            try
            {
                var locacoes = await _locacao.GetAllAsync();
                
                var filmes = await _filme.GetAllAsync();

                var topAlugadosId = locacoes.Info
                    .Where(p => p.DataLocacao >= p.DataLocacao.AddDays(-7))
                    .GroupBy(p => p.id_Filme)
                    .Select(p => new
                    {
                        id_Filme = p.Key,
                        count = p.Count()
                    }).OrderBy(p => p.count)
                    .Take(5)
                    .Select(p => p.id_Filme);

                //retira da ordem...
                //var menosAlugados = filmes.Info.Where(p => topAlugadosId.Contains(p.id)).ToList();
                var menosAlugados = new List<Filme>();
                foreach (var id in topAlugadosId)
                {
                    menosAlugados.Add(filmes.Info.FirstOrDefault(p => p.id == id));
                }

                return ResponseWrapper<List<Filme>>.Ok(menosAlugados);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<List<Filme>>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<List<Filme>>> GetNaoAlugados()
        {
            try
            {
                var locacoes = await _locacao.GetAllAsync();
                var filmes = await _filme.GetAllAsync();

                var alugadosId = locacoes.Info
                    .Select(p => p.id_Filme);

                var nuncaAlugados = filmes.Info.Where(p => !alugadosId.Contains(p.id)).ToList();


                return ResponseWrapper<List<Filme>>.Ok(nuncaAlugados);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<List<Filme>>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<List<Filme>>> GetTopAnoAlugados()
        {
            try
            {
                var locacoes = await _locacao.GetAllAsync();
                var filmes = await _filme.GetAllAsync();
                var topAlugadosId = locacoes.Info
                    .Where(p => p.DataLocacao >= p.DataLocacao.AddYears(-1))
                    .GroupBy(p => p.id_Filme)
                    .Select(p => new
                    {
                        id_Filme = p.Key,
                        count = p.Count()
                    }).OrderByDescending(p => p.count)
                    .Take(5)
                    .Select(p => p.id_Filme);
                //retira da ordem...
                //var maisAlugados = filmes.Info.Where(p => topAlugadosId.Contains(p.id)).ToList();
                var maisAlugados = new List<Filme>();
                foreach (var id in topAlugadosId)
                {
                    maisAlugados.Add(filmes.Info.FirstOrDefault(p => p.id == id));
                }

                return ResponseWrapper<List<Filme>>.Ok(maisAlugados);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<List<Filme>>.Error(ex.Message);
            }
        }

        public async Task<ResponseWrapper<List<Cliente>>> GetTopClienteAluguel()
        {
            try
            {
                var locacoes = await _locacao.GetAllAsync();
                var clientes = await _cliente.GetAllAsync();

                var topClientesId = locacoes.Info
                    .GroupBy(p => p.id_Cliente)
                    .Select(p => new
                    {
                        id_Cliente = p.Key,
                        count = p.Count()
                    }).OrderByDescending(p => p.count)
                    .Take(5)
                    .Select(p => p.id_Cliente);
                //retira da ordem...
                //var topClientes = clientes.Info.Where(p => topClientesId.Contains(p.id)).ToList();
                var topClientes = new List<Cliente>();
                foreach (var id in topClientesId)
                {
                    topClientes.Add(clientes.Info.FirstOrDefault( p=> p.id == id)); ;
                }

                return ResponseWrapper<List<Cliente>>.Ok(topClientes);
            }
            catch (Exception ex)
            {
                return ResponseWrapper<List<Cliente>>.Error(ex.Message);
            }
        }
    }
    public interface IRelatorioService
    {
        Task<ResponseWrapper<List<Cliente>>> GetAtrasados();
        Task<ResponseWrapper<List<Filme>>> GetNaoAlugados();
        Task<ResponseWrapper<List<Filme>>> GetTopAnoAlugados();
        Task<ResponseWrapper<List<Filme>>> GetBottomSemanaAlugados();
        Task<ResponseWrapper<List<Cliente>>> GetTopClienteAluguel();

    }
}
