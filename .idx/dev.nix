{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
    pkgs.nodejs_20
  ];

  idx = {
    previews = {
      enable = true;

      previews = {
        web = {
          cwd = "frontend";
          command = [
            "npm"
            "run"
            "dev"
            "--"
            "--host"
            "0.0.0.0"
            "--port"
            "$PORT"
          ];
          manager = "web";
        };
      };
    };
  };
}








