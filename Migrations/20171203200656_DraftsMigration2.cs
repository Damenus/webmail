using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WebMail.Migrations
{
    public partial class DraftsMigration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Attachment",
                table: "Mails",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AttachmentName",
                table: "Mails",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Receiver",
                table: "Mails",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Drafts",
                columns: table => new
                {
                    ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Attachment = table.Column<string>(type: "TEXT", nullable: true),
                    AttachmentName = table.Column<string>(type: "TEXT", nullable: true),
                    Body = table.Column<string>(type: "TEXT", nullable: true),
                    Date = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    Receiver = table.Column<string>(type: "TEXT", nullable: true),
                    Sender = table.Column<string>(type: "TEXT", nullable: true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    UniqueID = table.Column<uint>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drafts", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Drafts");

            migrationBuilder.DropColumn(
                name: "Attachment",
                table: "Mails");

            migrationBuilder.DropColumn(
                name: "AttachmentName",
                table: "Mails");

            migrationBuilder.DropColumn(
                name: "Receiver",
                table: "Mails");
        }
    }
}
