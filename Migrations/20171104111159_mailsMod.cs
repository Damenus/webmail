using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WebMail.Migrations
{
    public partial class mailsMod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Date",
                table: "Mails",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<string>(
                name: "Sender",
                table: "Mails",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<uint>(
                name: "UniqueID",
                table: "Mails",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0u);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Mails");

            migrationBuilder.DropColumn(
                name: "Sender",
                table: "Mails");

            migrationBuilder.DropColumn(
                name: "UniqueID",
                table: "Mails");
        }
    }
}
