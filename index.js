class Starship {
    constructor(
      phaserCharge_initial,
      numberOfPhotonTorpedos,
      energyPerPhotonTorpedo,
      shieldEnergy_initial,
      FleetDesignation
    ) {
      this.phaserCharge_initial = phaserCharge_initial;
      this.numberOfPhotonTorpedos = numberOfPhotonTorpedos;
      this.energyPerPhotonTorpedo = energyPerPhotonTorpedo;
      this.shieldEnergy_initial = shieldEnergy_initial;
      this.FleetDesignation = FleetDesignation;
      this.phaserCharge = this.phaserCharge_initial;
      this.shieldEnergy = this.shieldEnergy_initial;
      this.destroyed = false;
    }
  
    reportStatus() {
      return this.FleetDesignation;
    }
  
    firePhasers(targetShip) {
      if (this.phaserCharge <= 0) {
        return "Phasers are recharging.";
      } else if (this.destroyed) {
        return "Ship is destroyed.";
      } else {
        let phaserAttackStrength = Math.floor(Math.random() * this.phaserCharge);
        targetShip.takeDamage(phaserAttackStrength);
        this.phaserCharge = 0;
        return `Firing phasers with ${phaserAttackStrength} energy.`;
      }
    }
  
    firePhotonTorpedo(targetShip) {
      if (this.numberOfPhotonTorpedos <= 0) {
        return "No photon torpedoes remaining.";
      } else if (this.destroyed) {
        return "Ship is destroyed.";
      } else {
        let photonTorpedoAttackStrength = this.energyPerPhotonTorpedo;
        targetShip.takeDamage(photonTorpedoAttackStrength);
        this.numberOfPhotonTorpedos -= 1;
        return "Firing photon torpedo.";
      }
    }
  
    takeDamage(damageAmount) {
      if (this.destroyed) {
        return "Ship is already destroyed.";
      } else {
        this.shieldEnergy -= damageAmount;
        if (this.shieldEnergy < 0) {
          this.shieldEnergy = 0;
        }
        if (this.shieldEnergy === 0) {
          this.destroyed = true;
          return "Ship is destroyed.";
        } else {
          return `Ship has ${this.shieldEnergy} shield energy remaining.`;
        }
      }
    }
  
    reportShieldStrength() {
      if (this.destroyed) {
        return "Ship is destroyed.";
      } else {
        return `Shield strength is ${this.shieldEnergy}.`;
      }
    }
  }
  var FederationOrderOfBattle = [];
  var RomulanOrderOfBattle = [];
  
  // make 20 Federation Ships
  for (let counter = 0; counter < 20; counter++) {
    FederationOrderOfBattle[counter] = new Starship(
      10000,
      25,
      25,
      10000,
      "Starfleet"
    );
    console.log(FederationOrderOfBattle[counter].reportStatus());
  }
  
  // make 20 Romulan Ships
  for (let counter = 0; counter < 20; counter++) {
    RomulanOrderOfBattle[counter] = new Starship(
      7200,
      50,
      20,
      14000,
      "Romulan Star Empire"
    );
    console.log(RomulanOrderOfBattle[counter].reportStatus());
  }
  
  // randomly choose two ships to engage
  const shipIndex1 = Math.floor(Math.random() * 20);
  const shipIndex2 = Math.floor(Math.random() * 20);
  const ship1 = FederationOrderOfBattle[shipIndex1];
  const ship2 = RomulanOrderOfBattle[shipIndex2];
  
  // engage the ships until one is destroyed
  while (ship1.shieldStrength > 0 && ship2.shieldStrength > 0) {
    if (Math.random() < 0.5) {
      ship1.firePhasers();
      ship2.shieldStrength -= ship1.phaserAttackStrength;
      console.log(`Romulan Shield Strength is ${ship2.shieldStrength}`);
    } else {
      ship2.firePhasers();
      ship1.shieldStrength -= ship2.phaserAttackStrength;
      console.log(`Federation Shield Strength is ${ship1.shieldStrength}`);
    }
  }
  
  if (ship1.shieldStrength <= 0) {
    console.log("Romulans win!");
  } else {
    console.log("Federation wins!");
  }