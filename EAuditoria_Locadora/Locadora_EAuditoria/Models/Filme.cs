using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Locadora_EAuditoria.Models
{
    public sealed record Filme
    {
        [Key]
        public int id { get; set; }
        public string Titulo { get; set; }
        public int ClassificacaoIndicativa { get; set; }
        public int Lancamento { get; set; }
        [JsonIgnore]
        public List<Locacao>? Locacoes { get; set; }
        public Filme()
        {

        }
        public void Update(Filme item)
        {
            id = item.id;
            Titulo = item.Titulo;
            ClassificacaoIndicativa = item.ClassificacaoIndicativa;
            Lancamento = item.Lancamento;
        }
    }
}
