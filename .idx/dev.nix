# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{pkgs}: {
  # Which nixpkgs channel to use.
  channel = "stable-24.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.maven
    pkgs.jdk17
  ];
  # Sets environment variables in the workspace
  env = {};
  # This adds a file watcher to startup the firebase emulators. The emulators will only start if
  # a firebase.json file is written into the user's directory

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];
    workspace = {
      onCreate = {
      };
    };
    # Enable previews and customize configuration
    previews = {
      # enable = true;
      # previews = {
      #   web = {
      #     command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
      #     manager = "web";
      #   };
      # };
    };
  };
}
