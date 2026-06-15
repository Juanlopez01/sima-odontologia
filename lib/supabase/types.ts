export type EstadoDiente =
  | "sano"
  | "caries"
  | "extraccion"
  | "arreglo"
  | "implante"
  | "corona"
  | "ausente";

export type EstadoTurno = "pendiente" | "confirmado" | "rechazado" | "cancelado";

export interface Database {
  public: {
    Tables: {
      pacientes: {
        Row: {
          id: string;
          dni: string;
          nombre_completo: string;
          telefono: string | null;
          fecha_nacimiento: string;
        };
        Insert: Omit<Database["public"]["Tables"]["pacientes"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["pacientes"]["Insert"]>;
        Relationships: [];
      };
      odontogramas: {
        Row: {
          id: string;
          paciente_id: string;
          estado_dientes: Record<string, EstadoDiente>;
        };
        Insert: Omit<Database["public"]["Tables"]["odontogramas"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["odontogramas"]["Insert"]>;
        Relationships: [];
      };
      turnos: {
        Row: {
          id: string;
          paciente_id: string;
          fecha_turno: string;
          hora_turno: string;
          motivo: string;
          estado: EstadoTurno;
        };
        Insert: Omit<Database["public"]["Tables"]["turnos"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["turnos"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Turno     = Database["public"]["Tables"]["turnos"]["Row"];
export type Paciente  = Database["public"]["Tables"]["pacientes"]["Row"];
export type Odontograma = Database["public"]["Tables"]["odontogramas"]["Row"];
