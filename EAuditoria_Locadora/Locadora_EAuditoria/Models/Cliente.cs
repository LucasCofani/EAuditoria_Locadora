using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Locadora_EAuditoria.Models
{
    public sealed record Cliente
    {
        [Key]
        public int id { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        public DateTime DataNascimento { get; set; }
        [JsonIgnore]
        public List<Locacao>? Locacoes { get; set; }
        public Cliente()
        {

        }
        public void Update (Cliente item)
        {
            id = item.id;
            Nome = item.Nome;
            CPF = item.CPF;
            DataNascimento = item.DataNascimento;

        }

    }
}
