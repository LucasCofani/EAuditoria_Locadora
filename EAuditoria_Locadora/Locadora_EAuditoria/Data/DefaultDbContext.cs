using Locadora_EAuditoria.Models;
using Microsoft.EntityFrameworkCore;

namespace Locadora_EAuditoria.Data
{
    public class DefaultDbContext : DbContext
    {
        public DefaultDbContext(DbContextOptions<DefaultDbContext> options) : base(options)
        {

        }

        public DbSet<Cliente> clientes { get; set; }
        public DbSet<Locacao> locacoes { get; set; }
        public DbSet<Filme> filmes { get; set; }
    }
}
