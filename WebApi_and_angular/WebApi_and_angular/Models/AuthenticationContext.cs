using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi_and_angular.Models
{
    public class AuthenticationContext : IdentityDbContext
    {
        public AuthenticationContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
    }
}
