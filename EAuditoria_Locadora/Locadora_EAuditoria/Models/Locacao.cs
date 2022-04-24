using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Locadora_EAuditoria.Models
{
    public record Locacao
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("Cliente")]
        public int id_Cliente { get; set; }
        [ForeignKey("Filme")]
        public int id_Filme { get; set; }
        public DateTime DataLocacao { get; set; }
        public DateTime? DataDevolucao { get; set; }
        public Filme? Filme { get; set; }
        public Cliente? Cliente { get; set; }
        public Locacao()
        {

        }

        public void Update(Locacao item)
        {
            id = item.id;
            id_Cliente = item.id_Cliente;
            id_Filme = item.id_Filme;
            DataLocacao = item.DataLocacao;
            DataDevolucao = item.DataDevolucao;
        }
    }
}
