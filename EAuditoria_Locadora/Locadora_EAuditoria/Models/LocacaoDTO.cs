using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Locadora_EAuditoria.Models
{
    public sealed record LocacaoDTO : Locacao
    {
        public int Atrasado { get; set; }
        public LocacaoDTO()
        {

        }
        public LocacaoDTO(Locacao item)
        {
            id = item.id;
            id_Cliente = item.id_Cliente;
            id_Filme = item.id_Filme;
            DataLocacao = item.DataLocacao;
            DataDevolucao = item.DataDevolucao;
            Filme = item.Filme;
            Cliente = item.Cliente;
            if (item.Filme != null && item.DataDevolucao == null)
            {
                var diasEmAluguel = (DateTime.Now - item.DataLocacao).TotalDays;
                if (diasEmAluguel > 3)
                    Atrasado = 1;
                else if(item.Filme.Lancamento == 1 && diasEmAluguel > 2)
                    Atrasado = 1;
                
            }
        }
    }
}
